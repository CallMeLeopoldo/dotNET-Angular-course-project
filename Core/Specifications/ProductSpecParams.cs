namespace Core.Specifications
{
    public class ProductSpecParams
    {
        public int MaxSize { get; set; } = 50;
        public int PageIndex { get; set; } = 1;
        private int _pageSize { get; set; } = 6;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxSize) ? MaxSize : value;
        }

        public string Sort { get; set; }

        public int? BrandId {get; set; }

        public int? TypeId { get; set; }

        private string _search {get; set; } = "";

        public string Search {
            get => _search;
            set => value.ToLower();
        }
    }
}