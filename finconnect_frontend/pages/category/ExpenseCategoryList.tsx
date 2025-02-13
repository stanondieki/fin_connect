import { useState } from "react";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/table";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select2";

const CategoryList = () => {
  const [activeTab, setActiveTab] = useState("category");
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({ name: "", description: "", color: "" });
  const [subCategoryData, setSubCategoryData] = useState({ category: "", subCategory: "", description: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleSidebar = () => setCollapsed(!collapsed);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen transition-all flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
        <Navbar isSidebarCollapsed={collapsed} />
        <div className="p-6 bg-white shadow-md rounded-lg m-6">
          {/* Tabs */}
          <div className="flex border-b">
            <button className={`flex-1 py-2 text-center ${activeTab === "category" ? "bg-gray-100 font-semibold" : "bg-white"}`} onClick={() => setActiveTab("category")}>
              Category
            </button>
            <button className={`flex-1 py-2 text-center ${activeTab === "subcategory" ? "bg-gray-100 font-semibold" : "bg-white"}`} onClick={() => setActiveTab("subcategory")}>
              Sub Category
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{activeTab === "category" ? "Income Category List" : "Income Sub Category List"}</h2>
              <Button className="bg-blue-600 text-white" onClick={openModal}>
                + {activeTab === "category" ? "Add Income Category" : "Add Sub Category"}
              </Button>
            </div>
            
            {/* Search Bar */}
            <div className="mt-4">
              <Input placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
            </div>

            {/* Table */}
            <div className="mt-4 border rounded-lg">
              <Table>
                <Thead>
                  <Tr>
                    {activeTab === "category" ? (
                      <>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th>Color</Th>
                        <Th>Action</Th>
                      </>
                    ) : (
                      <>
                        <Th>Sub Category ID</Th>
                        <Th>Category</Th>
                        <Th>Sub Category</Th>
                        <Th>Description</Th>
                        <Th>Action</Th>
                      </>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td colSpan={activeTab === "category" ? 4 : 5} className="text-center py-4">
                      No data available in table
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="outline">
                Previous
              </Button>
              <span>Page {currentPage}</span>
              <Button onClick={handleNextPage} variant="outline">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
  <Modal onClose={closeModal}>
    <h2 className="text-xl font-semibold mb-4">
      {activeTab === "category" ? "Add Income Category" : "Add Sub Category"}
    </h2>
    <div className="space-y-4">
      {activeTab === "category" ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Input 
              placeholder="Enter category name" 
              value={categoryData.name} 
              onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Input 
              placeholder="Enter category description" 
              value={categoryData.description} 
              onChange={(e) => setCategoryData({ ...categoryData, description: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <Input 
              placeholder="Enter color (e.g., #FF5733)" 
              value={categoryData.color} 
              onChange={(e) => setCategoryData({ ...categoryData, color: e.target.value })} 
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <Select 
              options={["Category 1", "Category 2"]} 
              onChange={(val) => setSubCategoryData({ ...subCategoryData, category: val })} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sub Category</label>
            <Input 
              placeholder="Enter subcategory name" 
              value={subCategoryData.subCategory} 
              onChange={(e) => setSubCategoryData({ ...subCategoryData, subCategory: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Input 
              placeholder="Enter description" 
              value={subCategoryData.description} 
              onChange={(e) => setSubCategoryData({ ...subCategoryData, description: e.target.value })} 
            />
          </div>
        </>
      )}
    </div>
    <div className="flex justify-end space-x-2 mt-4">
      <Button variant="outline" onClick={closeModal}>Close</Button>
      <Button className="bg-blue-600 text-white">Save</Button>
    </div>
  </Modal>
)}

    </div>
  );
};

export default CategoryList;
