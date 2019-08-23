using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportsStore.Models
{
    public class Product
    {
    public long ProductId { get; set; }
    public String Name { get; set; }
    public String Category { get; set; }
    public String Description { get; set; }
    public decimal Price { get; set; }
    public Supplier Supplier { get; set; }
    public List<Rating> Ratings { get; set; }

  }
}
