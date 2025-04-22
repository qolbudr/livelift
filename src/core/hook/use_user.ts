import { useState, useEffect } from 'react';
import { LocalUser } from '@/core/types/local_user';

export const useUser = () : LocalUser | null => {
  const [user, setUser] = useState<LocalUser | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error('Failed to parse user from localStorage:', err);
        }
      }
    }
  }, []);

  return user;
};
