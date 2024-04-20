using System;
using GraphiQl;
using GraphQL.Server;
using GraphQL.Types;
using GraphQLApi.Data;
using GraphQLApi.Queries;
using GraphQLApi.Schemas;
using GraphQLApi.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace GraphQLApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<Context>(options =>
            {
                options.UseSqlite("Data Source=Data\\coursedb.sqlite");
            });
            services.AddScoped<ProQuery>();
            services.AddScoped<ISchema, CourseSchema>();
            services.AddScoped<CourseType>();
            services.AddScoped<RatingType>();
            services.AddScoped<PaymentTypeEnum>();
            services.AddGraphQL(options =>
                {
                    options.EnableMetrics = false;
                })
                .AddSystemTextJson()
                .AddGraphTypes(ServiceLifetime.Scoped);
            services.AddMvc(options => options.EnableEndpointRouting = false);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseGraphiQl("/graphql");
            app.UseGraphQL<ISchema>();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseMvc();
        }
    }
}