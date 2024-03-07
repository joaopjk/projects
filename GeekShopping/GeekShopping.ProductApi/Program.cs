using GeekShopping.ProductApi.Model.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
const string connectionString = "Server=127.0.0.1,3306;Database=geek-shopping;Uid=root;Pwd=root@1234";
builder.Services.AddDbContext<MySqlContext>(c =>
{
    c.UseMySql(connectionString, new MySqlServerVersion(new Version(8,2,0)));
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
