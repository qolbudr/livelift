import { useState, useEffect } from 'react';

export const useUser = () : any | null => {
  const [user, setUser] = useState<any | null>(null);

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
