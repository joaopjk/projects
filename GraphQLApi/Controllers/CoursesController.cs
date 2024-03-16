using System.Threading.Tasks;
using GraphQL.NewtonsoftJson;
using GraphQL.Types;
using GraphQLApi.Data.Entities;
using GraphQLApi.Queries;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace GraphQLApi.Controllers
{
    [Route("graphql")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ILogger<CoursesController> _logger;

        public CoursesController(ILogger<CoursesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("getCourses")]
        public async Task<string> GetCourses([FromQuery] string query)
        {
            var schema = Schema.For(@"
                    type Query {
                                   courses : [Course!]  
                                   course (id : ID!) : Course
                                                                                                            
                                 }
                    enum PaymentType {
                                        FREE ,
                                        PAID
                                  }
                    type Course {
                                    title: String!
                                    duration: Int
                                    level : String!
                                    instructor: String
                                    paymentType : PaymentType
                                    ratings : [Rating]
                                }
                    type Rating
                                {   
                                    id: ID!
                                    courseId : Int
                                    studentName : String
                                    starValue : Int
                                    review : String
                                }", builder =>
            {
                builder.Types.Include<Course>();
                builder.Types.Include<Query>();
            });

            var json = await schema.ExecuteAsync(options =>
            {
                options.Query = query;
            });

            return json;
        }
    }
}