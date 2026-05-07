import { getSupabase } from '../lib/supabase';

export interface ContentItem {
  id: string;
  section: string;
  key: string;
  value: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface ImageItem {
  id: string;
  section: string;
  name: string;
  image_url: string;
  alt_text?: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  created_at: string;
}

// Content Management
export const contentService = {
  async getAll(): Promise<ContentItem[]> {
    const { data, error } = await getSupabase()
      .from('website_content')
      .select('*');

    if (error) throw error;
    return data || [];
  },

  async getBySection(section: string): Promise<ContentItem[]> {
    const { data, error } = await getSupabase()
      .from('website_content')
      .select('*')
      .eq('section', section);

    if (error) throw error;
    return data || [];
  },

  async update(id: string, value: string): Promise<ContentItem> {
    const { data, error } = await getSupabase()
      .from('website_content')
      .update({
        value,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async create(section: string, key: string, value: string, type = 'text'): Promise<ContentItem> {
    const { data, error } = await getSupabase()
      .from('website_content')
      .insert({
        section,
        key,
        value,
        type,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await getSupabase()
      .from('website_content')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// Image Management
export const imageService = {
  async getAll(): Promise<ImageItem[]> {
    const { data, error } = await getSupabase()
      .from('website_images')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getBySection(section: string): Promise<ImageItem[]> {
    const { data, error } = await getSupabase()
      .from('website_images')
      .select('*')
      .eq('section', section)
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async create(section: string, name: string, imageUrl: string, altText = '', order = 0): Promise<ImageItem> {
    const { data, error } = await getSupabase()
      .from('website_images')
      .insert({
        section,
        name,
        image_url: imageUrl,
        alt_text: altText,
        order,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<ImageItem>): Promise<ImageItem> {
    const { data, error } = await getSupabase()
      .from('website_images')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await getSupabase()
      .from('website_images')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async reorder(items: Array<{ id: string; order: number }>): Promise<void> {
    for (const item of items) {
      const { error } = await getSupabase()
        .from('website_images')
        .update({ order: item.order })
        .eq('id', item.id);

      if (error) throw error;
    }
  },
};

// Contact Form Submissions
export const contactService = {
  async submit(name: string, email: string, phone: string, subject: string, message: string): Promise<ContactForm> {
    const { data, error } = await getSupabase()
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone,
        subject,
        message,
        status: 'new',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll(): Promise<ContactForm[]> {
    const { data, error } = await getSupabase()
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateStatus(id: string, status: 'new' | 'read' | 'responded'): Promise<ContactForm> {
    const { data, error } = await getSupabase()
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await getSupabase()
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// Analytics
export const analyticsService = {
  async trackPageView(page: string, referrer?: string): Promise<void> {
    try {
      const { error } = await getSupabase()
        .from('page_views')
        .insert({
          page,
          referrer: referrer || (typeof document !== 'undefined' ? document.referrer : ''),
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          timestamp: new Date().toISOString(),
        });

      if (error) console.error('Analytics error:', error);
    } catch {
      // Silently fail - analytics should never break the site
    }
  },

  async trackEvent(eventName: string, eventData?: Record<string, unknown>): Promise<void> {
    try {
      const { error } = await getSupabase()
        .from('events')
        .insert({
          event_name: eventName,
          event_data: eventData,
          timestamp: new Date().toISOString(),
        });

      if (error) console.error('Analytics error:', error);
    } catch {
      // Silently fail - analytics should never break the site
    }
  },
};
