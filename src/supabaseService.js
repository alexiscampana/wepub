// ── ShopPress Supabase Service Layer ─────────────────────────
// This file wraps all Supabase queries used across the app.
// It imports from your existing supabase.js client.
// All functions return { data, error } so callers can handle both.

import { supabase } from "./supabase.js";

// ════════════════════════════════════════════════════════════
// PRODUCTS
// ════════════════════════════════════════════════════════════

/** Fetch all products, optionally filtered by category */
export async function getProducts({
  category = null,
  search = null,
  limit = 50,
} = {}) {
  try {
    let query = supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (category) query = query.eq("category", category);
    if (search) query = query.ilike("name", `%${search}%`);

    const { data, error } = await query;
    return { data: data || [], error };
  } catch (err) {
    return { data: [], error: err };
  }
}

/** Fetch a single product by ID */
export async function getProduct(id) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/** Insert a new product */
export async function createProduct(product) {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([product])
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/** Update an existing product */
export async function updateProduct(id, updates) {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/** Delete a product */
export async function deleteProduct(id) {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);
    return { error };
  } catch (err) {
    return { error: err };
  }
}

// ════════════════════════════════════════════════════════════
// POSTS (Blog)
// ════════════════════════════════════════════════════════════

/** Fetch all published posts */
export async function getPosts({
  category = null,
  search = null,
  limit = 20,
} = {}) {
  try {
    let query = supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (category) query = query.eq("category", category);
    if (search)
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);

    const { data, error } = await query;
    return { data: data || [], error };
  } catch (err) {
    return { data: [], error: err };
  }
}

/** Fetch a single post by ID */
export async function getPost(id) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/** Create a new post */
export async function createPost(post) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ ...post, published: false }])
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/** Update a post */
export async function updatePost(id, updates) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

// ════════════════════════════════════════════════════════════
// ORDERS
// ════════════════════════════════════════════════════════════

/** Fetch orders for the current user */
export async function getOrders(userId) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    return { data: data || [], error };
  } catch (err) {
    return { data: [], error: err };
  }
}

/** Fetch a single order */
export async function getOrder(id) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Create a new order.
 *
 * NEW: this used to insert the raw checkout object directly, which
 * doesn't match the orders table (it sent fields like shipping_cost,
 * phone, shipping_address, items, payment_last4 — none of which are
 * real columns). That caused every checkout to fail silently, because
 * CheckoutPage swallows the error. This version correctly splits the
 * data: order-level fields go into `orders`, and each cart item goes
 * into its own row in `order_items`, matching the real schema.
 */
export async function createOrder(order) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: orderRow, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          order_number: order.order_number,
          user_id: user?.id || null,
          email: order.email,
          status: "paid", // simulated payment success
          subtotal: order.subtotal,
          shipping_amount: order.shipping_cost || 0,
          tax_amount: 0,
          total: order.total,
          currency: "USD",
          payment_method: "card",
          payment_status: "paid",
          notes: order.phone ? `Phone: ${order.phone}` : null,
        },
      ])
      .select()
      .single();

    if (orderError) return { data: null, error: orderError };

    if (order.items && order.items.length > 0) {
      const orderItemsPayload = order.items.map((item) => ({
        order_id: orderRow.id,
        product_title: item.name,
        variant_title: item.variant || null,
        quantity: item.qty,
        price: item.price,
        total: item.price * item.qty,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsPayload);

      if (itemsError) return { data: orderRow, error: itemsError };
    }

    return { data: orderRow, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

/** Update order status */
export async function updateOrderStatus(id, status) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

// ════════════════════════════════════════════════════════════
// USER PROFILE
// ════════════════════════════════════════════════════════════

/** Fetch user profile from auth metadata or a profiles table if you have one */
export async function getUserProfile(userId) {
  try {
    // Try a profiles table first — if you don't have one, falls back to auth user
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      // Fallback: get from Supabase auth user metadata
      const { data: authData } = await supabase.auth.getUser();
      return { data: authData?.user?.user_metadata || null, error: null };
    }
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/** Update user profile */
export async function updateUserProfile(userId, updates) {
  try {
    // Update auth metadata
    const { data: authData, error: authError } = await supabase.auth.updateUser(
      {
        data: updates,
      },
    );

    // Use UPDATE not upsert — profile row already exists from signup trigger
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: updates.name || updates.full_name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (profileError) {
      console.error("Profile update error:", profileError);
    }

    return { data: authData, error: authError };
  } catch (err) {
    return { data: null, error: err };
  }
}

// ════════════════════════════════════════════════════════════
// AUTH HELPERS
// ════════════════════════════════════════════════════════════

/** Sign up with email and password */
export async function signUp(email, password, name) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/** Sign in with email and password */
export async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/** Sign out */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    return { error: err };
  }
}

/** Get current session */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}
