using System;

namespace GraphQLApi.Data.Entities
{
    public class Rating : BaseEntity
    {
        public int CourseId { get; set; }
        public string StudentName { get; set; }
        public int StarValue { get; set; }
        public string Review { get; set; }
    }
}