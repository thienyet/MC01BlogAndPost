using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01BlogAndPost.Entities
{
    public class Blog
    {
        public int BlogId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}