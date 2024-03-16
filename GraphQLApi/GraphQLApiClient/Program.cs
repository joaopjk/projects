using System;

namespace GraphQLApiClient
{
    class Program
    {
        static void Main(string[] args)
        {
            GraphQLCourseClient.GetCoursesViaHttp().Wait();
            Console.ReadKey();
        }
    }
}