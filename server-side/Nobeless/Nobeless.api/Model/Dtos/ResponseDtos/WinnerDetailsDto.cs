namespace Nobeless.api.Model.Dtos.ResponseDtos
{
    public class WinnerDetailsDto
    {
        public Guid WinnerId { get; set; }
        public string WinnerName { get; set; }
        public decimal WinningBidAmount { get; set; }
        public DateTime BidTime { get; set; }

    }
}
