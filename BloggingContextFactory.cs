using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SportsStore.Models;


namespace SportsStore
{
  public class DataContextFactory : IDesignTimeDbContextFactory<DataContext>
  {
    public DataContextFactory() { }

    public DataContext CreateDbContext(String[] args)
    {
      var OptionsBuilder = new DbContextOptionsBuilder<DataContext>();
      OptionsBuilder.UseSqlite("Data Source = blog.db");

      return new DataContext(OptionsBuilder.Options);
    }
  }
}
