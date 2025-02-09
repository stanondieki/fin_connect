export const fetchUser = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found");
      return null;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
  
      const data = await response.json();
      console.log("User Data:", data.user);
      return data.user;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  