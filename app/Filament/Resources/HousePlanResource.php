<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HousePlanResource\Pages;
use App\Models\HousePlan;
use Filament\Forms\Components;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Actions;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class HousePlanResource extends Resource
{
    protected static ?string $model = HousePlan::class;

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-home';
    }

    public static function getNavigationSort(): ?int
    {
        return 4;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Plan Details')
                    ->schema([
                        Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (string $state, callable $set) => $set('slug', Str::slug($state))),
                        
                        Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        
                        Components\TextInput::make('price')
                            ->required()
                            ->numeric()
                            ->prefix('$')
                            ->minValue(0),
                        
                        Components\Toggle::make('is_featured')
                            ->label('Featured Plan')
                            ->helperText('Featured plans will be highlighted'),
                    ])
                    ->columns(2),
                
                Section::make('Specifications')
                    ->schema([
                        Components\TextInput::make('bedrooms')
                            ->required()
                            ->numeric()
                            ->minValue(0),
                        
                        Components\TextInput::make('bathrooms')
                            ->required()
                            ->numeric()
                            ->minValue(0),
                        
                        Components\TextInput::make('floors')
                            ->required()
                            ->numeric()
                            ->minValue(1),
                        
                        Components\TextInput::make('area')
                            ->required()
                            ->numeric()
                            ->suffix('sq ft')
                            ->minValue(0),
                    ])
                    ->columns(4),
                
                Section::make('Files')
                    ->schema([
                        Components\FileUpload::make('preview_image')
                            ->image()
                            ->directory('house-plans/images')
                            ->visibility('public'),
                        
                        Components\FileUpload::make('pdf_file')
                            ->label('PDF File')
                            ->required()
                            ->acceptedFileTypes(['application/pdf'])
                            ->directory('house-plans/pdfs')
                            ->visibility('public'),
                    ])
                    ->columns(2),
                
                Section::make('Description')
                    ->schema([
                        Components\RichEditor::make('description')
                            ->required()
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('preview_image')
                    ->label('Image')
                    ->circular(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('price')
                    ->money('USD')
                    ->sortable(),
                Tables\Columns\TextColumn::make('bedrooms')
                    ->label('Beds')
                    ->sortable(),
                Tables\Columns\TextColumn::make('bathrooms')
                    ->label('Baths')
                    ->sortable(),
                Tables\Columns\TextColumn::make('area')
                    ->label('Area')
                    ->suffix(' sq ft')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Featured'),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListHousePlans::route('/'),
            'create' => Pages\CreateHousePlan::route('/create'),
            'edit' => Pages\EditHousePlan::route('/{record}/edit'),
        ];
    }
}
