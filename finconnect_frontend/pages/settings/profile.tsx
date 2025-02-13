import { useState } from "react";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";

export default function ProfileSettings() {
    const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    address: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem("authToken"); // Retrieve the token
    if (!token) {
      alert("User is not authenticated");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
  
      alert("Profile updated successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        alert(error.message);
      } else {
        console.error("An unknown error occurred", error);
      }
    }
  };
  
  
  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen transition-all flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
        <Navbar isSidebarCollapsed={collapsed} />
        <div className="max-w-4xl mx-auto p-6">
          <Card>
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div>
                  <label className="block text-sm font-medium">First Name</label>
                  <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Date of Birth</label>
                  <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <Input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium">Country</label>
                  <Input type="text" name="country" value={formData.country} onChange={handleChange} />
                </div>

                {/* Right Column - Password Update */}
                <div className="col-span-2 mt-4">
                  <h3 className="text-lg font-semibold mb-2">Change Password</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Old Password</label>
                      <Input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">New Password</label>
                      <Input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium">Confirm New Password</label>
                      <Input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} required />
                    </div>
                  </div>
                </div>

                <div className="col-span-2 mt-4">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
