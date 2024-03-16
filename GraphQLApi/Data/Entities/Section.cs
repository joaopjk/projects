using System.Collections.Generic;

namespace GraphQLApi.Data.Entities
{
    public class Section : BaseEntity
    {
        public int CourseId { get; set; }
        public int SeqNo { get; set; }
        public string Title { get; set; }
        public List<Lecture> Lectures { get; set; }
    }
}