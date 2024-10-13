using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;

namespace Nobeless.api.Service
{
    public interface ProductService
    {


        Task<string> AddProduct(ProductDtos productDto);
       
        Task<List<Products>> GetProductsByUserIdAsyn(Guid id);

        Task<Products> GetProductByIdAsync(int productId);

        Task DeleteProductByIdAsync(int productId);
        Task ApproveProductAsync(int productId);
    }
}
