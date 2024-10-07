namespace Nobeless.api.Model.Dtos.RequestDtos
{
    public class ProductDtos
    {

        public string Name { get; set; }
        public string Description { get; set; }

        public double StartingPrise { get; set; }

        public IFormFile thumbnailImage { get; set; }

        public Guid UserId { get; set; }

        public int CategoryId { get; set; }
    }
}
