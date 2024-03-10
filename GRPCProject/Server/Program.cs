using Grpc.Core;

const int Port = 5005;
Server server = null;
try
{
    server = new Server
    {
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