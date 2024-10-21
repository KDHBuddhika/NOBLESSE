namespace Nobeless.api.Model.Dtos.ResponseDtos
{
    public class DashboardStatisticsDtos
    {
        public int TotalUsers { get; set; }
        public int TotalAuctions { get; set; }
        public int OngoingAuctions { get; set; }
        public int PendingProductApprovals { get; set; }
        public int TotalBidders { get; set; }
        public int TotalSellers { get; set; }
    }
}
