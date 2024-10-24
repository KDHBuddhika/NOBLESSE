using System.ComponentModel.DataAnnotations.Schema;

namespace Nobeless.api.Model.Domain
{
    public class Contact
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
         public int Id { get; set; }

         public string Email { get; set; }

        public string Massage { get; set; }
    }
}
