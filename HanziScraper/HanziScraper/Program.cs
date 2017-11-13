using AngleSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace HanziScraper
{
    class Program
    {
        public List<CharacterBreakdown> GerCharacterBreakdown(string character)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            var config = Configuration.Default.WithDefaultLoader();
            var address = "http://www.hanzicraft.com/character/" + character;
            var newList = new List<CharacterBreakdown>();
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
            {


                CharacterBreakdown result = new CharacterBreakdown();
                result.Meaning = parsedItems.Component;
                result.Component = parsedItems.Definition;
                
                newList.Add(result);
            }

            return newList;


            //var outputString =
            //    String.Join(
            //        ", ",
            //        parsedItems
            //        .Select(node =>
            //            $"{node.Component}: {node.Definition}"
            //        )
            //        .ToArray()
            //    );

            //Console.WriteLine(outputString);
            //Console.ReadLine();



        }
    }
}
