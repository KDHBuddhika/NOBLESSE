using System.CodeDom.Compiler;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Nobeless.api.Model.Domain
{
    public class Categories
    {
        
        public Guid Id { get; set; }

        public String CategoriesName { get; set; }

        public ICollection<Products> Products { get; set; }
    }
}
