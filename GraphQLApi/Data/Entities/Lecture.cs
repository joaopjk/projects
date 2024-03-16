namespace GraphQLApi.Data.Entities
{
    public abstract class Lecture : BaseEntity
    {
        public int SectionId { get; set; }
        public int CourseId { get; set; }
        public int SeqNo { get; set; }
        public string Name { get; set; }
    }
}