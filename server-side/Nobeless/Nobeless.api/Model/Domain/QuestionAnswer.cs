using System.ComponentModel.DataAnnotations.Schema;

namespace Nobeless.api.Model.Domain
{
    public class QuestionAnswer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
