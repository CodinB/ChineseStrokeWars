using AngleSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace CharacterDecomposer.Models
{
    public class DecompService
    {

        public List<List<CharacterBreakdown>> GetCharacterBreakdown(string character)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            var config = Configuration.Default.WithDefaultLoader();
            var address = "http://www.hanzicraft.com/character/" + character;
            var newList = new List<CharacterBreakdown>();
            var document = BrowsingContext.New(config).OpenAsync(address).Result;
            var cellSelector = "div.decomptitle";
            var resultList =
                document.QuerySelectorAll(cellSelector)// every element that matches the selector
                .Where(elem => elem.TextContent.StartsWith("Radical"))
                .Select(decomptitle =>
                   decomptitle.NextElementSibling
                   .Children
                   .Select(node => new CharacterBreakdown
                   {
                       Component = node.QuerySelector("a").TextContent,
                       Meaning = Regex.Replace(
                           node.QuerySelector(".smaller-font").TextContent,
                           @"^\s*\(|\)\s*$",
                           ""),
                       WholeCharacter = decomptitle
                                        .NextElementSibling
                                        .ChildNodes
                                        .Where(c => c.NodeType == AngleSharp.Dom.NodeType.Text)
                                        .First()
                                        .TextContent


                   })
                   .ToList()
                )
                .ToList();

            return resultList;
        }
    }
}
