export const fetchSession = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
  
      if (!token) return null;
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (!response.ok) throw new Error("Failed to fetch session");
  
      const data = await response.json();
      return data.user || null;
    } catch (error) {
      console.error("Error fetching session:", error);
      return null;
    }
  };
  