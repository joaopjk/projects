using System;
using System.Threading.Tasks;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;

namespace GraphQLApiClient
{
    public class GraphQLCourseClient
    {
        public static async Task GetCoursesViaHttp()
        {
            var graphQLClient = new GraphQLHttpClient(
                new Uri("http://localhost:5006/graphql/getCourses"), new NewtonsoftJsonSerializer());

            var qString = "{ courses {instructor, title, duration, ratings{studentName, starValue, review}}}";

            var response = await graphQLClient.HttpClient.GetAsync(
                @"http://localhost:5006/graphql/getCourses?query=" + qString);

            var result = await response.Content.ReadAsStringAsync();
            Console.WriteLine(result);
        }
    }
}