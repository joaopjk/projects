using System;
using GraphQL.Types;

namespace GraphQLApi.Schemas
{
    public class CourseSchema : Schema
    {
        public CourseSchema(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            
        }
    }
}