using AngleSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace HanziScraper
{
    class CharacterDecomposer
    {
        public List<CharacterBreakdown> GetCharacterBreakdown(string character)
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


            //var parsedItems =
            //    decomptitle.NextElementSibling
            //    .Children
            //    .Select(node => new
            //    {
            //        Component = node.QuerySelector("a").TextContent,
            //        Definition = Regex.Replace(
            //            node.QuerySelector(".smaller-font").TextContent,
            //            @"^\s*\(|\)\s*$",
            //            "")
            //    })
            //    .ToArray();

            var resultList =
                decomptitle.NextElementSibling
                .Children
                .Select(node => new CharacterBreakdown
                {
                    Component = node.QuerySelector("a").TextContent,
                    Meaning = Regex.Replace(
                        node.QuerySelector(".smaller-font").TextContent,
                        @"^\s*\(|\)\s*$",
                        "")
                })
                .ToList();

            //foreach (var item in parsedItems)
            //{


            //    CharacterBreakdown result = new CharacterBreakdown();
            //    result.Meaning = parsedItems
            //        .Select(node =>
            //            $"{node.Definition}")
            //            .ToString();
            //    result.Component = parsedItems
            //        .Select(node =>
            //            $"{node.Component}")
            //            .ToString();


            //    newList.Add(result);
            //}

            return resultList;


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
