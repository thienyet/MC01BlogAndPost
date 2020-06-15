using MC01BlogAndPost.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MC01BlogAndPost.Services.Interfaces
{
    public interface IPostService : IBaseService<Post>
    {
        IEnumerable<Post> FindByBlogId(int blogId);

        Post GetOne(int postId);
    }
}
