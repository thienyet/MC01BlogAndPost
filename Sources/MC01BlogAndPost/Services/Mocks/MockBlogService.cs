using MC01BlogAndPost.Entities;
using MC01BlogAndPost.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01BlogAndPost.Services.Mocks
{
    public class MockBlogService : IBlogService
    {

        private static List<Blog> ListBlogs = new List<Blog>();
        private static int AutoIncrease = 1;

        public MockBlogService()
        {
            if (ListBlogs.Count <= 0)
            {
                for (var i = 1; i <= 10; ++i)
                {
                    ListBlogs.Add(new Blog()
                    {
                        BlogId = (AutoIncrease++),
                        Title = "Title " + i,
                        Content = "Content " + i
                    });
                }
            }
        }

        public bool AddNew(Blog data)
        {
            data.BlogId = (AutoIncrease++);
            ListBlogs.Add(data);
            return true;
        }

        public List<Blog> GetLists()
        {
            ListBlogs.Sort((b1, b2) => b2.BlogId.CompareTo(b1.BlogId));
            return ListBlogs;
        }
    }
}