using Greet;
using Grpc.Core;
using Server;

const int Port = 5005;
Grpc.Core.Server server = null;

try
{
    server = new Grpc.Core.Server
    {
        Services = { GreetingService.BindService(new GreetingServiceImp()) },
        Ports = { new ServerPort("localhost", Port, ServerCredentials.Insecure) }
    };

    server.Start();
    Console.WriteLine($"The server is listening on the port: {Port}");

    Console.ReadKey();
}
catch (IOException e)
{
    Console.WriteLine(e.Message);
    throw;
}
finally
{
    server?.ShutdownAsync().Wait();
}