using System;
using System.Threading.Tasks;
using GraphQL;
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

            const string qString = "{ courses {instructor, title, duration, ratings{studentName, starValue, review}}}";

            var response = await graphQLClient.HttpClient.GetAsync(
                @"http://localhost:5006/graphql/getCourses?query=" + qString);

            var result = await response.Content.ReadAsStringAsync();
            Console.WriteLine(result);
        }

        public static async Task GetCoursesViaHttpPost()
        {
            var graphQLClient = new GraphQLHttpClient(
                new Uri("http://localhost:5006/graphql/getCourses"), new NewtonsoftJsonSerializer());
            
            const string qString = "{ courses {instructor, title, duration, ratings{studentName, starValue, review}}}";
            var post = new GraphQLRequest
            {
                Query = qString
            };

            var response = await graphQLClient.SendQueryAsync<object>(post);
        }
    }
}