namespace Nobeless.api.Model.Dtos.ResponseDtos
{
    public class ProductDetailsDto
    {
        public string ProductName { get; set; }
        public string CategoryName { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public bool IsApproved { get; set; }

    }
}
