using GraphQL;

namespace GraphQLApi.Queries
{
    public class GraphQLQuery
    {
        public string Query { get; set; }
        public Inputs Variables { get; set; }
        public string OperationName { get; set; }
    }
}