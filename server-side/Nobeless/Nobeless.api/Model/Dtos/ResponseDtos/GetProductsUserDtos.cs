namespace Nobeless.api.Model.Dtos.ResponseDtos
{
    public class GetProductsUserDtos
    {
        public int productId { get; set; }
        public string productName { get; set; }
        public string CategoryName { get; set; }

        public float StartingPrice { get; set; }

        public bool IsApproved { get; set; }

        public string ThumbnailImage { get; set; }
    }
}
