using GraphQL.Types;
using GraphQLApi.Data;
using GraphQLApi.Types;
using Microsoft.EntityFrameworkCore;

namespace GraphQLApi.Queries
{
    public class ProQuery : ObjectGraphType
    {
        public ProQuery(Context dbContext)
        {
            Field<ListGraphType<CourseType>>("course")
                .Resolve(_ =>
                {
                    var courses = dbContext.Courses
                        .Include(c => c.Ratings)
                        .AsTracking()
                        .ToListAsync();
                    return courses;
                });
        }
    }
}