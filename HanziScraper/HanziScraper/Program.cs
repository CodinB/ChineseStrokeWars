using AngleSharp;
using AngleSharp.Dom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
namespace HanziScraper
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            var config = Configuration.Default.WithDefaultLoader();
            var address = "http://www.hanzicraft.com/character/累";
            //var address = "view-source:http://hskhsk.pythonanywhere.com/radicals?hsk=16";
            var document = BrowsingContext.New(config).OpenAsync(address).Result;
            var cellSelector = "div.decomptitle";
            var decomptitle =
                document.QuerySelectorAll(cellSelector)// every element that matches the selector
                .Where(elem => elem.TextContent.StartsWith("Radical"))
                .First();


            var parsedItems =
                decomptitle.NextElementSibling
                .Children
                .Select(node => new
                {
                    Component = node.QuerySelector("a").TextContent,
                    Definition = Regex.Replace(
                        node.QuerySelector(".smaller-font").TextContent,
                        @"^\s*\(|\)\s*$",
                        "")
                })
                .ToArray();

            foreach (var item in parsedItems)
                Console.WriteLine(item);


            var outputString =
                String.Join(
                    ", ",
                    parsedItems
                    .Select(node =>
                        $"{node.Component}: {node.Definition}"
                    )
                    .ToArray()
                );

            Console.WriteLine(outputString);



        }
    }
}
