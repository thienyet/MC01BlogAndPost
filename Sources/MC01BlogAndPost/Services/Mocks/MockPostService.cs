using MC01BlogAndPost.Entities;
using MC01BlogAndPost.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01BlogAndPost.Services.Mocks
{
    public class MockPostService : IPostService
    {
        private static List<Post> ListPosts = new List<Post>();

        public MockPostService()
        {
            if (ListPosts.Count <= 0)
            {
                for (var i = 1; i <= 30; ++i)
                {
                    ListPosts.Add(new Post()
                    {
                        PostId = i,
                        Title = "Title post" + i,
                        Content = "Content post" + i,
                        BlogId = (i%10)
                    });
                }
            }
        }

        public bool AddNew(Post data)
        {
            ListPosts.Add(data);
            return true;
        }

        public IEnumerable<Post> FindByBlogId(int blogId)
        {
            foreach(var post in ListPosts)
            {
                if(post.BlogId == blogId)
                {
                    yield return post;
                }
            }
        }

        public List<Post> GetLists()
        {
            return ListPosts;
        }

        public Post GetOne(int postId)
        {
            return ListPosts.FirstOrDefault(p => p.PostId == postId);
        }
    }
}