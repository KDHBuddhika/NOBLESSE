namespace Nobeless.api.Model.Dtos.ResponseDtos.Dashboard
{
    public class DashboardProductDetailsDtos
    {
        public string ImageUrl { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public double StartingPrice { get; set; }
        public string CategoryName { get; set; }

        public bool IsApproved { get; set; }

        // User details
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
    }
}
