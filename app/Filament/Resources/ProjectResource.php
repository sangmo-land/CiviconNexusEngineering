<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Filament\Forms\Components;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Actions;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-building-office';
    }

    public static function getNavigationSort(): ?int
    {
        return 2;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Project Details')
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
                        
                        Components\TextInput::make('location')
                            ->required()
                            ->maxLength(255),
                        
                        Components\Select::make('project_type')
                            ->required()
                            ->options([
                                'Residential' => 'Residential',
                                'Commercial' => 'Commercial',
                                'Industrial' => 'Industrial',
                                'Infrastructure' => 'Infrastructure',
                                'Renovation' => 'Renovation',
                                'Mixed Use' => 'Mixed Use',
                            ]),
                        
                        Components\TextInput::make('client')
                            ->maxLength(255),
                        
                        Components\TextInput::make('completion_year')
                            ->label('Completion Year')
                            ->numeric()
                            ->minValue(1900)
                            ->maxValue(2100),
                        
                        Components\TextInput::make('role')
                            ->required()
                            ->maxLength(255)
                            ->helperText('e.g., General Contractor, Structural Engineer, etc.'),
                        
                        Components\Toggle::make('is_featured')
                            ->label('Featured Project')
                            ->helperText('Featured projects will be displayed on the homepage'),
                    ])
                    ->columns(2),
                
                Section::make('Description')
                    ->schema([
                        Components\RichEditor::make('description')
                            ->required()
                            ->columnSpanFull(),
                    ]),
                
                Section::make('Project Images')
                    ->schema([
                        Components\Repeater::make('images')
                            ->relationship()
                            ->schema([
                                Components\FileUpload::make('image_path')
                                    ->label('Image')
                                    ->image()
                                    ->required()
                                    ->directory('projects')
                                    ->visibility('public'),
                                Components\TextInput::make('caption')
                                    ->maxLength(255),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->addActionLabel('Add Image')
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['caption'] ?? 'Image'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('images.image_path')
                    ->label('Image')
                    ->circular()
                    ->stacked()
                    ->limit(3),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('location')
                    ->searchable(),
                Tables\Columns\TextColumn::make('project_type')
                    ->badge()
                    ->searchable(),
                Tables\Columns\TextColumn::make('completion_year')
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
                Tables\Filters\SelectFilter::make('project_type')
                    ->options([
                        'Residential' => 'Residential',
                        'Commercial' => 'Commercial',
                        'Industrial' => 'Industrial',
                        'Infrastructure' => 'Infrastructure',
                        'Renovation' => 'Renovation',
                        'Mixed Use' => 'Mixed Use',
                    ]),
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
        return [
            RelationManagers\ImagesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
