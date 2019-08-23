using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportsStore.Models
{
    public class Supplier
    {
    public long SupplierId { get; set; }
    public String Name { get; set; }
    public String City { get; set; }
    public String State { get; set; }
    public IEnumerable<Product> Products { get; set; }
  }
}
