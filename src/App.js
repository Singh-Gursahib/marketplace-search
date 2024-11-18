import React, { useState, useEffect, useCallback } from 'react';

import { Slider } from './components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Label } from './components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { 
  ExternalLink, 
  RefreshCw, 
  DollarSign, 
  MapPin, 
  Search, 
  TagIcon,
  SlidersHorizontal
} from 'lucide-react';

const MarketplaceURLGenerator = () => {
  const [filters, setFilters] = useState({
    category: '',
    condition: 'new',
    location: '',
    keyword: '',
    minPrice: '',
    maxPrice: '',
    radius: 10,
    sortBy: 'creation_time_descend'
  });

  const [activeFilters, setActiveFilters] = useState(0);
  const [generatedURL, setGeneratedURL] = useState('');

  const categories = [
    { value: 'electronics', label: 'Electronics', icon: '📱' },
    { value: 'vehicles', label: 'Vehicles', icon: '🚗' },
    { value: 'property_rentals', label: 'Property Rentals', icon: '🏠' },
    { value: 'apparel', label: 'Apparel', icon: '👕' },
    { value: 'home_garden', label: 'Home & Garden', icon: '🏡' },
    { value: 'furniture', label: 'Furniture', icon: '🪑' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎮' },
    { value: 'books', label: 'Books', icon: '📚' }
  ];

  const sortOptions = [
    { value: 'creation_time_descend', label: 'Newest First' },
    { value: 'creation_time_ascend', label: 'Oldest First' },
    { value: 'price_ascend', label: 'Lowest Price' },
    { value: 'price_descend', label: 'Highest Price' }
  ];

  const conditions = [
    { value: 'new', label: 'New', description: 'Brand new, unused items' },
    { value: 'used_good', label: 'Used - Good', description: 'Gently used, fully functional' },
    { value: 'used_fair', label: 'Used - Fair', description: 'Shows wear but works fine' }
  ];

  // Define generateURL using useCallback and place it before useEffect
  const generateURL = useCallback(() => {
    const baseURL = 'https://www.facebook.com/marketplace';
    const params = new URLSearchParams();

    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.location) params.append('location', filters.location);
    if (filters.radius) params.append('radius', filters.radius);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.condition) params.append('itemCondition', filters.condition);
    if (filters.keyword) params.append('query', filters.keyword);

    let url = filters.category 
      ? `${baseURL}/category/${filters.category}` 
      : baseURL;

    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    setGeneratedURL(url);
  }, [filters]);

  // Define countActiveFilters using useCallback and place it before useEffect
  const countActiveFilters = useCallback(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.location) count++;
    if (filters.keyword) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.radius !== 10) count++;
    if (filters.condition !== 'new') count++;
    if (filters.sortBy !== 'creation_time_descend') count++;
    setActiveFilters(count);
  }, [filters]);

  // Now use useEffect after defining the functions
  useEffect(() => {
    generateURL();
    countActiveFilters();
  }, [generateURL, countActiveFilters]);

  const handleReset = () => {
    setFilters({
      category: '',
      condition: 'new',
      location: '',
      keyword: '',
      minPrice: '',
      maxPrice: '',
      radius: 10,
      sortBy: 'creation_time_descend'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Marketplace Search
            </h1>
            <p className="mt-2 text-gray-600">
              Customize your search parameters to find exactly what you're looking for
            </p>
          </div>
          {activeFilters > 0 && (
            <Badge variant="secondary" className="text-sm">
              {activeFilters} {activeFilters === 1 ? 'filter' : 'filters'} active
            </Badge>
          )}
        </div>

        <Tabs defaultValue="main" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="main" className="space-x-2">
              <Search className="h-4 w-4" />
              <span>Main Search</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="space-x-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Advanced Filters</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="main" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label>What are you looking for?</Label>
                    <Input
                      type="text"
                      placeholder="Enter keywords..."
                      value={filters.keyword}
                      onChange={(e) => setFilters({...filters, keyword: e.target.value})}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {categories.map((category) => (
                        <Button
                          key={category.value}
                          variant={filters.category === category.value ? "default" : "outline"}
                          className="h-auto flex-col space-y-2 p-4"
                          onClick={() => setFilters({...filters, category: category.value})}
                        >
                          <span className="text-xl">{category.icon}</span>
                          <span className="text-sm">{category.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>Location</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="City, State"
                        value={filters.location}
                        onChange={(e) => setFilters({...filters, location: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Search Radius: {filters.radius} miles</Label>
                      <Slider
                        value={[filters.radius]}
                        onValueChange={(value) => setFilters({...filters, radius: value[0]})}
                        max={100}
                        min={1}
                        step={1}
                        className="py-4"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label>Item Condition</Label>
                    <RadioGroup
                      value={filters.condition}
                      onValueChange={(value) => setFilters({...filters, condition: value})}
                      className="grid gap-4 sm:grid-cols-3"
                    >
                      {conditions.map((condition) => (
                        <div
                          key={condition.value}
                          className={`flex cursor-pointer items-start space-x-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 ${
                            filters.condition === condition.value ? 'border-purple-600' : 'border-gray-200'
                          }`}
                          onClick={() => setFilters({...filters, condition: condition.value})}
                        >
                          <RadioGroupItem value={condition.value} id={condition.value} />
                          <div className="space-y-1">
                            <Label htmlFor={condition.value} className="font-medium">
                              {condition.label}
                            </Label>
                            <p className="text-sm text-gray-500">{condition.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Price Range</span>
                    </Label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        type="number"
                        placeholder="Min price"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                      />
                      <Input
                        type="number"
                        placeholder="Max price"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <TagIcon className="h-4 w-4" />
                      <span>Sort Results</span>
                    </Label>
                    <Select
                      value={filters.sortBy}
                      onValueChange={(value) => setFilters({...filters, sortBy: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sort order" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex space-x-4">
          <Button
            onClick={() => window.open(generatedURL, '_blank')}
            className="flex-1 bg-purple-600 py-6 text-lg hover:bg-purple-700"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            Search Marketplace
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="px-6"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceURLGenerator;
