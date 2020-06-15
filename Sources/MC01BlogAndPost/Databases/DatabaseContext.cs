using MC01BlogAndPost.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MC01BlogAndPost.Databases
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() : base("ConnectionStringToDB")
        {

        }

        public DbSet<Blog> Blogs { get; set; }
    }
}