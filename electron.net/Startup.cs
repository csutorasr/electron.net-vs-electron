using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ElectronNET.API;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace electron.net
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 &&
                   !Path.HasExtension(context.Request.Path.Value) &&
                   !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                    Electron.IpcMain.On("todos", (todos) =>
                    {
                        if (todos.GetType() == typeof(JArray))
                        {
                            var list = new List<ToDo>();
                            foreach (var todo in (JArray)todos)
                            {
                                list.Add(new ToDo
                                {
                                    text = ((JObject)todo).Value<string>("text"),
                                    done = ((JObject)todo).Value<bool>("done")
                                });
                            }
                            File.WriteAllText(@"todos.json", JsonConvert.SerializeObject(list));
                        }
                    });
                    Electron.IpcMain.On("load-todos", (args) =>
                    {
                        string todos = "[]";
                        if (File.Exists(@"todos.json"))
                        {
                            todos = File.ReadAllText(@"todos.json");
                        }
                        var mainWindow = Electron.WindowManager.BrowserWindows.First();
                        Electron.IpcMain.Send(mainWindow, "todos", todos);
                    });
                }
            });

            app.UseStaticFiles();

            Task.Run(async () => await Electron.WindowManager.CreateWindowAsync());
        }
    }
}
