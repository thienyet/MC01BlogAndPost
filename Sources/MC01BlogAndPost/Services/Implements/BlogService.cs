using MC01BlogAndPost.Databases;
using MC01BlogAndPost.Entities;
using MC01BlogAndPost.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01BlogAndPost.Services.Implements
{
    public class BlogService : IBlogService
    {
        public bool AddNew(Blog data)
        {
            try
            {
                DatabaseContext context = new DatabaseContext();
                context.Blogs.Add(data);
                context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public List<Blog> GetLists()
        {
            DatabaseContext context = new DatabaseContext();
            return context.Blogs.ToList();
        }
    }
}