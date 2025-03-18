class SubCategoryHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/sub-categoryFunctions.php`; // Update with the correct PHP file
    }

    async fetchWithErrorHandling(url, options = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status === 'error') {
                throw new Error(data.message);
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
        // ... existing fetchWithErrorHandling method ...
    }

    async getSubCategory() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    async addSubCategory(categoryData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(categoryData)
        });
    }

// Add this method to your SubCategoryHandler class
async getSubCategoriesByCategoryId(categoryId) {
    return this.fetchWithErrorHandling(`${this.baseUrl}?action=listByCategoryId&categoryId=${categoryId}`, {
      method: 'GET'
    });
  }
  
  async deleteSubCategoriesByCategoryId(categoryId) {
    try {
      // First, get all subcategories associated with this category ID
      const subcategoriesResult = await this.getSubCategoriesByCategoryId(categoryId);
      
      if (subcategoriesResult.status !== "success" || !subcategoriesResult.data) {
        return { status: "error", message: "Failed to fetch subcategories" };
      }
      
      const subcategories = subcategoriesResult.data;
      
      // Loop through each subcategory and delete it
      const deletePromises = subcategories.map(subcategory => 
        this.deleteSubCategory(subcategory.SubCategories_Id)
      );
      
      // Wait for all deletions to complete
      const results = await Promise.all(deletePromises);
      
      // Check if any deletions failed
      const failedDeletions = results.filter(result => result.status !== "success");
      
      if (failedDeletions.length > 0) {
        return { 
          status: "error", 
          message: `Failed to delete ${failedDeletions.length} subcategories`,
          failures: failedDeletions 
        };
      }
      
      return { 
        status: "success", 
        message: `Successfully deleted ${results.length} subcategories` 
      };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

    async deleteSubCategory(categoryId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${categoryId}`, {
            method: 'DELETE'
        });
    }

    async updateSubCategory(categoryId, categoryData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${categoryId}`, {
            method: 'PUT',
            body: JSON.stringify(categoryData)
        });
    }
}

export default new SubCategoryHandler(); 