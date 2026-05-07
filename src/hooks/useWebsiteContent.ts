import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ContentItem {
  section: string;
  key: string;
  value: string;
  type: string;
}

export function useWebsiteContent() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    loadContent();

    const channel = supabase
      .channel('website_content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_content',
        },
        () => {
          loadContent();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const loadContent = async () => {
    if (!supabase) return;
    try {
      const { data } = await supabase.from('website_content').select('section, key, value');
      if (data) {
        const contentMap: Record<string, string> = {};
        data.forEach((item: ContentItem) => {
          contentMap[`${item.section}.${item.key}`] = item.value;
        });
        setContent(contentMap);
      }
    } catch (err) {
      console.error('Error loading content:', err);
    } finally {
      setLoading(false);
    }
  };

  const get = (section: string, key: string, fallback = '') => {
    return content[`${section}.${key}`] || fallback;
  };

  return { content, loading, get };
}

export function useWebsiteImages(section: string) {
  const [images, setImages] = useState<Array<{ id: string; name: string; image_url: string; alt_text?: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    loadImages();

    const channel = supabase
      .channel(`website_images_${section}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_images',
          filter: `section=eq.${section}`,
        },
        () => {
          loadImages();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [section]);

  const loadImages = async () => {
    if (!supabase) return;
    try {
      const { data } = await supabase
        .from('website_images')
        .select('id, name, image_url, alt_text, order')
        .eq('section', section)
        .order('order', { ascending: true });

      if (data) setImages(data);
    } catch (err) {
      console.error('Error loading images:', err);
    } finally {
      setLoading(false);
    }
  };

  return { images, loading };
}
