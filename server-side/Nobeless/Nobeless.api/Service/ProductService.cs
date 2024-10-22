using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Model.Dtos.ResponseDtos;
using System.Threading.Tasks;

namespace Nobeless.api.Service
{
    public interface ProductService
    {


        Task<string> AddProduct(ProductDtos productDto);
       
        Task ApproveProductAsync(int productId);

        Task<List<GetProductsUserDtos>> GetProductsByUserIdAsync(Guid userId);

        Task<ProductDetailsDto> GetProductDetailsByIdAsync(int productId);

        Task<List<GetProductsUserDtos>> GetAllProducts();

        Task<bool> DeleteProductAsync(int id);
    }
}
